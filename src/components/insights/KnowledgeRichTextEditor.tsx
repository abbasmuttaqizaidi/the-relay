import React, { useState, useRef, useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table, TableRow, TableHeader, TableCell } from "@tiptap/extension-table";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Unlink,
  ExternalLink,
  Image as ImageIcon,
  Table as TableIcon,
  Undo,
  Redo,
  RemoveFormatting,
  Highlighter,
  Palette,
  Plus,
  Trash2,
  Loader2,
  Check,
  Columns,
  Rows,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { uploadKnowledgeImage } from "../../functions/uploadKnowledgeImage";
import { toast } from "sonner";

// Custom Image extension with alignment and caption attributes
const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      alignment: {
        default: "center",
        parseHTML: (element) => element.getAttribute("data-align") || "center",
        renderHTML: (attributes) => {
          return {
            "data-align": attributes.alignment || "center",
            class: `tiptap-image tiptap-image-${attributes.alignment || "center"}`,
          };
        },
      },
      caption: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-caption"),
        renderHTML: (attributes) => {
          if (!attributes.caption) return {};
          return { "data-caption": attributes.caption };
        },
      },
    };
  },
});

export interface KnowledgeRichTextEditorProps {
  contentJson?: string | null;
  initialPlainText?: string;
  onChange: (data: { json: string; text: string; wordCount: number; charCount: number }) => void;
  knowledgeId?: string | null;
  placeholder?: string;
  disabled?: boolean;
  minHeight?: string;
  className?: string;
}

const TEXT_COLORS = [
  { label: "Default", value: "#0f172a" },
  { label: "Orange (Brand)", value: "#ea580c" },
  { label: "Blue", value: "#2563eb" },
  { label: "Green", value: "#059669" },
  { label: "Slate Muted", value: "#64748b" },
  { label: "Red", value: "#dc2626" },
];

const HIGHLIGHT_COLORS = [
  { label: "Yellow", value: "#fef08a" },
  { label: "Orange", value: "#fed7aa" },
  { label: "Green", value: "#bbf7d0" },
  { label: "Blue", value: "#bfdbfe" },
];

export function KnowledgeRichTextEditor({
  contentJson,
  initialPlainText,
  onChange,
  knowledgeId,
  placeholder = "Write your practical knowledge, lessons learned, or observations...",
  disabled = false,
  minHeight = "380px",
  className = "",
}: KnowledgeRichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Link dialog state
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  // Image URL modal state
  const [imageUrlDialogOpen, setImageUrlDialogOpen] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [customImageAlt, setCustomImageAlt] = useState("");
  const [customImageCaption, setCustomImageCaption] = useState("");

  // Metrics
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  // Initial Content parsing
  const getInitialContent = () => {
    if (contentJson && contentJson.trim()) {
      try {
        const parsed = JSON.parse(contentJson);
        if (parsed && parsed.type === "doc") {
          return parsed;
        }
      } catch (e) {
        console.warn("[KnowledgeRichTextEditor] Failed to parse contentJson:", e);
      }
    }
    if (initialPlainText && initialPlainText.trim()) {
      return {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: initialPlainText }],
          },
        ],
      };
    }
    return {
      type: "doc",
      content: [{ type: "paragraph" }],
    };
  };

  const editor = useEditor({
    immediatelyRender: false,
    editable: !disabled,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          class: "text-orange-600 underline underline-offset-3 cursor-pointer",
        },
      }),
      CustomImage.configure({
        allowBase64: false,
        HTMLAttributes: {
          class: "rounded-md border border-slate-200 max-h-[500px] object-contain my-3 shadow-xs",
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "w-full border-collapse my-3 text-xs sm:text-sm border border-slate-200 rounded",
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: "border-b border-slate-200",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "bg-slate-50 p-2.5 font-semibold text-slate-800 border-r border-slate-200",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "p-2.5 text-slate-700 border-r border-slate-200",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: getInitialContent(),
    editorProps: {
      attributes: {
        class: `prose prose-slate max-w-none focus:outline-none p-5 sm:p-7 text-slate-800 font-sans text-base leading-relaxed`,
        style: `min-height: ${minHeight};`,
      },
      transformPastedHTML(html) {
        // STRICT: Strip video, iframe, embed, and object tags
        return html
          .replace(/<(iframe|video|embed|object)[^>]*>.*?<\/\1>/gis, "")
          .replace(/<(iframe|video|embed|object)[^>]*\/>/gis, "");
      },
    },
    onUpdate: ({ editor: ed }) => {
      const json = JSON.stringify(ed.getJSON());
      const text = ed.getText();
      const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
      const chars = text.length;

      setCharCount(chars);
      setWordCount(words);
      onChange({ json, text, wordCount: words, charCount: chars });
    },
  });

  // Calculate metrics on initial mount if content exists
  useEffect(() => {
    if (editor) {
      const text = editor.getText();
      const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
      setCharCount(text.length);
      setWordCount(words);
    }
  }, [editor]);

  // Sync external contentJson changes if reloaded (e.g. edit mode fetched)
  useEffect(() => {
    if (!editor || !contentJson) return;
    try {
      const parsed = JSON.parse(contentJson);
      if (parsed && parsed.type === "doc") {
        const currentJson = JSON.stringify(editor.getJSON());
        if (currentJson !== contentJson) {
          editor.commands.setContent(parsed, { emitUpdate: false });
          const text = editor.getText();
          const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
          setCharCount(text.length);
          setWordCount(words);
        }
      }
    } catch {
      // Ignore
    }
  }, [contentJson, editor]);

  // Handle local file image upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type: images only, NO video
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file: Only images (PNG, JPG, WebP, GIF, SVG) are supported. Videos are not allowed.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File is too large: Images must be under 10MB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      setIsUploadingImage(true);
      toast.loading("Uploading image...", { id: "upload-img" });

      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(",")[1];
          resolve(base64);
        };
        reader.onerror = reject;
      });
      reader.readAsDataURL(file);
      const fileBase64 = await base64Promise;

      const res = await uploadKnowledgeImage({
        data: {
          fileBase64,
          mimeType: file.type,
          fileName: file.name,
          knowledge_id: knowledgeId,
        },
      });

      if (res?.imageUrl && editor) {
        editor
          .chain()
          .focus()
          .setImage({
            src: res.imageUrl,
            alt: file.name.replace(/\.[^/.]+$/, ""),
          })
          .run();
        toast.success("Image uploaded successfully!", { id: "upload-img" });
      }
    } catch (err: any) {
      console.error("[KnowledgeRichTextEditor] Image upload failed:", err);
      toast.error(err?.message || "Failed to upload image. Please try again.", {
        id: "upload-img",
      });
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Insert Custom URL Image
  const handleInsertCustomImageUrl = () => {
    if (!customImageUrl || !editor) return;
    try {
      const parsed = new URL(customImageUrl);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        toast.error("Please provide a valid https:// image URL.");
        return;
      }
    } catch {
      toast.error("Please enter a valid URL.");
      return;
    }

    editor
      .chain()
      .focus()
      .setImage({
        src: customImageUrl,
        alt: customImageAlt || "Knowledge Illustration",
        ...(customImageCaption ? { caption: customImageCaption } : {}),
      } as any)
      .run();

    setImageUrlDialogOpen(false);
    setCustomImageUrl("");
    setCustomImageAlt("");
    setCustomImageCaption("");
  };

  // Link Insertion
  const handleSaveLink = () => {
    if (!editor) return;
    if (!linkUrl.trim()) {
      editor.chain().focus().unsetLink().run();
      setLinkDialogOpen(false);
      return;
    }

    let formatted = linkUrl.trim();
    if (
      !formatted.startsWith("http://") &&
      !formatted.startsWith("https://") &&
      !formatted.startsWith("mailto:")
    ) {
      formatted = `https://${formatted}`;
    }

    // Disallow javascript: URLs
    if (formatted.toLowerCase().startsWith("javascript:")) {
      toast.error("Unsafe URL protocol rejected.");
      return;
    }

    editor.chain().focus().setLink({ href: formatted }).run();
    setLinkDialogOpen(false);
    setLinkUrl("");
  };

  if (!editor) {
    return (
      <div className="w-full h-72 rounded border border-slate-200 bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={`border border-slate-200/90 rounded-sm bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col focus-within:border-slate-400 transition-colors ${className}`}
    >
      {/* ═══════════════════════════════════════════════════════════════════
          GROUPED TOOLBAR
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-200/80 bg-slate-50/60 sticky top-14 z-10">
        {/* History Group */}
        <div className="flex items-center gap-0.5 pr-1 border-r border-slate-200">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo() || disabled}
            title="Undo (Ctrl+Z)"
            className="h-8 w-8 p-0 text-slate-600 hover:text-slate-900"
          >
            <Undo className="w-3.5 h-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo() || disabled}
            title="Redo (Ctrl+Y)"
            className="h-8 w-8 p-0 text-slate-600 hover:text-slate-900"
          >
            <Redo className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Headings Selector */}
        <div className="pr-1 border-r border-slate-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs font-mono font-medium text-slate-700 hover:bg-slate-100"
                disabled={disabled}
              >
                {editor.isActive("heading", { level: 1 })
                  ? "H1"
                  : editor.isActive("heading", { level: 2 })
                    ? "H2"
                    : editor.isActive("heading", { level: 3 })
                      ? "H3"
                      : editor.isActive("heading", { level: 4 })
                        ? "H4"
                        : "Paragraph"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44 text-xs font-mono">
              <DropdownMenuItem onClick={() => editor.chain().focus().setParagraph().run()}>
                Paragraph
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                <Heading1 className="w-3.5 h-3.5 mr-2" /> Heading 1 (Large)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                <Heading2 className="w-3.5 h-3.5 mr-2" /> Heading 2 (Medium)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                <Heading3 className="w-3.5 h-3.5 mr-2" /> Heading 3 (Small)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
                <Heading4 className="w-3.5 h-3.5 mr-2" /> Heading 4 (Sub)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Text Formatting Group */}
        <div className="flex items-center gap-0.5 pr-1 border-r border-slate-200">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            data-active={editor.isActive("bold") ? "true" : undefined}
            disabled={disabled}
            title="Bold"
            className="h-8 w-8 p-0 text-slate-700 hover:text-slate-900 data-[active=true]:bg-slate-200 data-[active=true]:text-slate-900"
          >
            <Bold className="w-3.5 h-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            data-active={editor.isActive("italic") ? "true" : undefined}
            disabled={disabled}
            title="Italic"
            className="h-8 w-8 p-0 text-slate-700 hover:text-slate-900 data-[active=true]:bg-slate-200 data-[active=true]:text-slate-900"
          >
            <Italic className="w-3.5 h-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            data-active={editor.isActive("underline") ? "true" : undefined}
            disabled={disabled}
            title="Underline"
            className="h-8 w-8 p-0 text-slate-700 hover:text-slate-900 data-[active=true]:bg-slate-200 data-[active=true]:text-slate-900"
          >
            <UnderlineIcon className="w-3.5 h-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            data-active={editor.isActive("strike") ? "true" : undefined}
            disabled={disabled}
            title="Strikethrough"
            className="h-8 w-8 p-0 text-slate-700 hover:text-slate-900 data-[active=true]:bg-slate-200 data-[active=true]:text-slate-900"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCode().run()}
            data-active={editor.isActive("code") ? "true" : undefined}
            disabled={disabled}
            title="Inline Code"
            className="h-8 w-8 p-0 text-slate-700 hover:text-slate-900 data-[active=true]:bg-slate-200 data-[active=true]:text-slate-900"
          >
            <Code className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Text Colors & Highlight Popovers */}
        <div className="flex items-center gap-0.5 pr-1 border-r border-slate-200">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-slate-700 hover:text-slate-900"
                title="Text Color"
                disabled={disabled}
              >
                <Palette className="w-3.5 h-3.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
                Text Color
              </span>
              {TEXT_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => editor.chain().focus().setColor(c.value).run()}
                  className="w-full flex items-center justify-between text-xs px-2 py-1 rounded hover:bg-slate-100 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border border-slate-200" style={{ backgroundColor: c.value }} />
                    {c.label}
                  </span>
                  {editor.isActive("textStyle", { color: c.value }) && <Check className="w-3 h-3 text-slate-900" />}
                </button>
              ))}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().unsetColor().run()}
                className="w-full text-xs h-7 mt-1 text-slate-500 font-mono"
              >
                Reset color
              </Button>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-slate-700 hover:text-slate-900"
                title="Highlight"
                disabled={disabled}
              >
                <Highlighter className="w-3.5 h-3.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
                Highlight
              </span>
              {HIGHLIGHT_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => editor.chain().focus().toggleHighlight({ color: c.value }).run()}
                  className="w-full flex items-center justify-between text-xs px-2 py-1 rounded hover:bg-slate-100 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm border border-slate-200" style={{ backgroundColor: c.value }} />
                    {c.label}
                  </span>
                  {editor.isActive("highlight", { color: c.value }) && <Check className="w-3 h-3 text-slate-900" />}
                </button>
              ))}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().unsetHighlight().run()}
                className="w-full text-xs h-7 mt-1 text-slate-500 font-mono"
              >
                Remove highlight
              </Button>
            </PopoverContent>
          </Popover>
        </div>

        {/* Lists Group */}
        <div className="flex items-center gap-0.5 pr-1 border-r border-slate-200">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            data-active={editor.isActive("bulletList") ? "true" : undefined}
            disabled={disabled}
            title="Bullet List"
            className="h-8 w-8 p-0 text-slate-700 hover:text-slate-900 data-[active=true]:bg-slate-200"
          >
            <List className="w-3.5 h-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            data-active={editor.isActive("orderedList") ? "true" : undefined}
            disabled={disabled}
            title="Numbered List"
            className="h-8 w-8 p-0 text-slate-700 hover:text-slate-900 data-[active=true]:bg-slate-200"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Alignment Group */}
        <div className="flex items-center gap-0.5 pr-1 border-r border-slate-200">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            data-active={editor.isActive({ textAlign: "left" }) ? "true" : undefined}
            disabled={disabled}
            title="Align Left"
            className="h-8 w-8 p-0 text-slate-700 hover:text-slate-900 data-[active=true]:bg-slate-200"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            data-active={editor.isActive({ textAlign: "center" }) ? "true" : undefined}
            disabled={disabled}
            title="Align Center"
            className="h-8 w-8 p-0 text-slate-700 hover:text-slate-900 data-[active=true]:bg-slate-200"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            data-active={editor.isActive({ textAlign: "right" }) ? "true" : undefined}
            disabled={disabled}
            title="Align Right"
            className="h-8 w-8 p-0 text-slate-700 hover:text-slate-900 data-[active=true]:bg-slate-200"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            data-active={editor.isActive({ textAlign: "justify" }) ? "true" : undefined}
            disabled={disabled}
            title="Justify"
            className="h-8 w-8 p-0 text-slate-700 hover:text-slate-900 data-[active=true]:bg-slate-200"
          >
            <AlignJustify className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Blocks & Insert Group */}
        <div className="flex items-center gap-0.5 pr-1 border-r border-slate-200">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            data-active={editor.isActive("blockquote") ? "true" : undefined}
            disabled={disabled}
            title="Quote"
            className="h-8 w-8 p-0 text-slate-700 hover:text-slate-900 data-[active=true]:bg-slate-200"
          >
            <Quote className="w-3.5 h-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            disabled={disabled}
            title="Horizontal Divider"
            className="h-8 w-8 p-0 text-slate-700 hover:text-slate-900"
          >
            <Minus className="w-3.5 h-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              const previousUrl = editor.getAttributes("link").href;
              setLinkUrl(previousUrl || "");
              setLinkDialogOpen(true);
            }}
            data-active={editor.isActive("link") ? "true" : undefined}
            disabled={disabled}
            title="Link"
            className="h-8 w-8 p-0 text-slate-700 hover:text-slate-900 data-[active=true]:bg-slate-200"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Image Insertion (Upload or URL) */}
        <div className="flex items-center gap-0.5 pr-1 border-r border-slate-200">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            className="hidden"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled || isUploadingImage}
                className="h-8 px-2 text-xs font-mono text-slate-700 hover:text-slate-900 flex items-center gap-1.5"
                title="Insert Image"
              >
                {isUploadingImage ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <ImageIcon className="w-3.5 h-3.5 text-orange-600" />
                )}
                <span>Image</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 text-xs font-mono">
              <DropdownMenuItem
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer"
              >
                Upload from device
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setImageUrlDialogOpen(true)}
                className="cursor-pointer"
              >
                Insert image from URL
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Table Group */}
        <div className="flex items-center gap-0.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled}
                data-active={editor.isActive("table") ? "true" : undefined}
                className="h-8 px-2 text-xs font-mono text-slate-700 hover:text-slate-900 flex items-center gap-1.5 data-[active=true]:bg-slate-200"
                title="Table Operations"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Table</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 text-xs font-mono">
              {!editor.isActive("table") ? (
                <DropdownMenuItem
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                      .run()
                  }
                  className="cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 mr-2" /> Insert 3x3 Table
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().addRowAfter().run()}
                    className="cursor-pointer"
                  >
                    <Rows className="w-3.5 h-3.5 mr-2" /> Add Row After
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().deleteRow().run()}
                    className="cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-2 text-red-500" /> Delete Row
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().addColumnAfter().run()}
                    className="cursor-pointer"
                  >
                    <Columns className="w-3.5 h-3.5 mr-2" /> Add Column After
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().deleteColumn().run()}
                    className="cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-2 text-red-500" /> Delete Column
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().deleteTable().run()}
                    className="cursor-pointer text-red-600 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-2 text-red-600" /> Delete Table
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          EDITOR CONTENT CANVAS
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex-1 min-h-[380px] bg-white cursor-text">
        <EditorContent editor={editor} />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          STATUS / METRICS BAR
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="border-t border-slate-100 px-4 py-2 bg-slate-50/70 flex items-center justify-between text-xs font-mono text-slate-500">
        <div className="flex items-center gap-4">
          <span>{wordCount} words</span>
          <span>•</span>
          <span className={charCount < 50 ? "text-amber-600" : charCount > 5000 ? "text-red-600 font-semibold" : "text-slate-600"}>
            {charCount} / 5,000 chars {charCount < 50 && "(min 50)"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span>Markdown & paste supported</span>
          <span>•</span>
          <span className="text-slate-400">Images supported (no video)</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          LINK DIALOG
          ═══════════════════════════════════════════════════════════════════ */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-mono text-sm uppercase">Add or Edit Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-mono">Target URL</Label>
              <Input
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="font-mono text-sm"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setLinkDialogOpen(false);
              }}
              className="text-xs font-mono text-red-600 hover:text-red-700"
            >
              Remove Link
            </Button>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setLinkDialogOpen(false)}
                className="text-xs font-mono"
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleSaveLink}
                className="text-xs font-mono bg-slate-900 text-white"
              >
                Apply
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══════════════════════════════════════════════════════════════════
          IMAGE URL DIALOG
          ═══════════════════════════════════════════════════════════════════ */}
      <Dialog open={imageUrlDialogOpen} onOpenChange={setImageUrlDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-mono text-sm uppercase">Insert Image by URL</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <Label className="text-xs font-mono">Image URL (https://...)</Label>
              <Input
                placeholder="https://images.unsplash.com/..."
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-mono">Alt Text</Label>
              <Input
                placeholder="Brief description of the image"
                value={customImageAlt}
                onChange={(e) => setCustomImageAlt(e.target.value)}
                className="text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-mono">Caption (optional)</Label>
              <Input
                placeholder="Source, context, or chart explanation"
                value={customImageCaption}
                onChange={(e) => setCustomImageCaption(e.target.value)}
                className="text-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setImageUrlDialogOpen(false)}
              className="text-xs font-mono"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleInsertCustomImageUrl}
              className="text-xs font-mono bg-slate-900 text-white"
            >
              Insert Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
