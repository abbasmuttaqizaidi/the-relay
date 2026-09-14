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
  MoreHorizontal,
  Loader2,
  Check,
  Columns,
  Rows,
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
import { uploadQuestionImage } from "../../functions/uploadQuestionImage";
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

export interface QuestionRichTextEditorProps {
  contentJson?: string | null;
  initialPlainText?: string;
  onChange: (data: { json: string; text: string }) => void;
  questionId?: string | null;
  businessId?: string | null;
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

export function QuestionRichTextEditor({
  contentJson,
  initialPlainText,
  onChange,
  questionId,
  placeholder = "Write context, background, specific constraints, and questions...",
  disabled = false,
  minHeight = "220px",
  className = "",
}: QuestionRichTextEditorProps) {
  // File input ref for image uploads
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

  // Parse initial content
  const getInitialContent = () => {
    if (contentJson && contentJson.trim()) {
      try {
        const parsed = JSON.parse(contentJson);
        if (parsed && parsed.type === "doc") {
          return parsed;
        }
      } catch (e) {
        console.warn("[QuestionRichTextEditor] Failed to parse contentJson:", e);
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
          class: "rounded-md border border-slate-200 max-h-[450px] object-contain my-3 shadow-xs",
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
        class: `prose prose-slate max-w-none focus:outline-none p-4 text-slate-800 font-sans text-sm leading-relaxed`,
        style: `min-height: ${minHeight};`,
      },
    },
    onUpdate: ({ editor: ed }) => {
      const json = JSON.stringify(ed.getJSON());
      const text = ed.getText();
      onChange({ json, text });
    },
  });

  // Keep editable state synced
  useEffect(() => {
    if (editor && editor.isEditable === disabled) {
      editor.setEditable(!disabled);
    }
  }, [editor, disabled]);

  // Handle Link Dialog Open
  const openLinkDialog = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href || "";
    setLinkUrl(previousUrl);
    setLinkDialogOpen(true);
  };

  const handleApplyLink = () => {
    if (!editor) return;
    if (!linkUrl.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      let formattedUrl = linkUrl.trim();
      if (!/^https?:\/\//i.test(formattedUrl) && !/^mailto:/i.test(formattedUrl)) {
        formattedUrl = `https://${formattedUrl}`;
      }
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: formattedUrl, target: "_blank" })
        .run();
    }
    setLinkDialogOpen(false);
  };

  const handleRemoveLink = () => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
    setLinkDialogOpen(false);
  };

  // Handle Image File Upload
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPEG, WebP, GIF, SVG).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image file size must be less than 10MB.");
      return;
    }

    try {
      setIsUploadingImage(true);
      toast.loading("Uploading image...", { id: "question-img-upload" });

      // Convert file to base64
      const base64Promise = new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          // Strip the data URL prefix e.g. "data:image/png;base64,"
          const base64 = result.split(",")[1];
          resolve(base64);
        };
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });

      const fileBase64 = await base64Promise;

      const res = await uploadQuestionImage({
        data: {
          fileBase64,
          mimeType: file.type,
          fileName: file.name,
          question_id: questionId || null,
        },
      });

      if (res && res.imageUrl) {
        editor
          .chain()
          .focus()
          .setImage({
            src: res.imageUrl,
            alt: file.name.replace(/\.[^/.]+$/, ""),
          })
          .run();
        toast.success("Image uploaded successfully", { id: "question-img-upload" });
      }
    } catch (err: any) {
      console.error("[QuestionRichTextEditor] Upload failed:", err);
      toast.error(err.message || "Failed to upload image. Please try again.", {
        id: "question-img-upload",
      });
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Handle Direct Image URL insertion
  const handleInsertImageUrl = () => {
    if (!editor || !customImageUrl.trim()) return;
    let url = customImageUrl.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }
    editor
      .chain()
      .focus()
      .setImage({
        src: url,
        alt: customImageAlt.trim() || "Question image",
        title: customImageCaption.trim() || undefined,
      })
      .run();
    setImageUrlDialogOpen(false);
    setCustomImageUrl("");
    setCustomImageAlt("");
    setCustomImageCaption("");
  };

  if (!editor) {
    return (
      <div className="flex items-center justify-center p-8 border border-slate-200 rounded-md bg-slate-50 text-slate-400">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        <span className="text-xs font-mono">Initializing editor...</span>
      </div>
    );
  }

  // Active state helpers
  const currentHeading = editor.isActive("heading", { level: 1 })
    ? "H1"
    : editor.isActive("heading", { level: 2 })
      ? "H2"
      : editor.isActive("heading", { level: 3 })
        ? "H3"
        : editor.isActive("heading", { level: 4 })
          ? "H4"
          : editor.isActive("heading", { level: 5 })
            ? "H5"
            : editor.isActive("heading", { level: 6 })
              ? "H6"
              : "P";

  return (
    <div
      className={`border border-slate-200 rounded-md bg-white focus-within:border-slate-800 focus-within:ring-1 focus-within:ring-slate-800 transition-all ${className}`}
    >
      {/* Hidden image file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={handleImageFileChange}
      />

      {/* TOOLBAR */}
      <div className="border-b border-slate-200 bg-slate-50/80 px-2.5 py-1.5 flex flex-wrap items-center gap-1 text-slate-700 select-none">
        {/* GROUP 1: Primary Formatting (Always visible on mobile & desktop) */}
        <div className="flex items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`h-8 w-8 p-0 rounded text-slate-700 hover:text-slate-900 ${
              editor.isActive("bold") ? "bg-slate-200 text-slate-900 font-bold" : ""
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`h-8 w-8 p-0 rounded text-slate-700 hover:text-slate-900 ${
              editor.isActive("italic") ? "bg-slate-200 text-slate-900" : ""
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`h-8 w-8 p-0 rounded text-slate-700 hover:text-slate-900 ${
              editor.isActive("underline") ? "bg-slate-200 text-slate-900" : ""
            }`}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="w-4 h-4" />
          </Button>

          {/* Desktop-only Strikethrough & Code inline */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`hidden sm:inline-flex h-8 w-8 p-0 rounded text-slate-700 hover:text-slate-900 ${
              editor.isActive("strike") ? "bg-slate-200 text-slate-900" : ""
            }`}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`hidden sm:inline-flex h-8 w-8 p-0 rounded text-slate-700 hover:text-slate-900 ${
              editor.isActive("code") ? "bg-slate-200 text-slate-900" : ""
            }`}
            title="Inline Code"
          >
            <Code className="w-4 h-4" />
          </Button>
        </div>

        <div className="hidden sm:block w-[1px] h-5 bg-slate-200 mx-1" />

        {/* GROUP 2: Headings Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs font-mono font-semibold text-slate-700 hover:text-slate-900 gap-1 rounded bg-white border border-slate-200 sm:border-transparent sm:bg-transparent"
              title="Headings"
            >
              <span>{currentHeading}</span>
              <span className="text-[10px] text-slate-400">▼</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44 bg-white border-slate-200">
            <DropdownMenuItem
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={currentHeading === "P" ? "bg-slate-100 font-semibold" : ""}
            >
              <span className="text-xs">Normal Text (P)</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={currentHeading === "H1" ? "bg-slate-100 font-semibold" : ""}
            >
              <Heading1 className="w-4 h-4 mr-2" />
              <span className="text-base font-bold">Heading 1</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={currentHeading === "H2" ? "bg-slate-100 font-semibold" : ""}
            >
              <Heading2 className="w-4 h-4 mr-2" />
              <span className="text-sm font-bold">Heading 2</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={currentHeading === "H3" ? "bg-slate-100 font-semibold" : ""}
            >
              <Heading3 className="w-4 h-4 mr-2" />
              <span className="text-xs font-bold">Heading 3</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              className={currentHeading === "H4" ? "bg-slate-100 font-semibold" : ""}
            >
              <Heading4 className="w-4 h-4 mr-2" />
              <span className="text-xs font-semibold">Heading 4</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
              className={currentHeading === "H5" ? "bg-slate-100 font-semibold" : ""}
            >
              <span className="text-xs font-semibold ml-6">Heading 5</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
              className={currentHeading === "H6" ? "bg-slate-100 font-semibold" : ""}
            >
              <span className="text-xs uppercase font-mono ml-6">Heading 6</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-[1px] h-5 bg-slate-200 mx-1" />

        {/* GROUP 3: Lists & Blocks */}
        <div className="flex items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`h-8 w-8 p-0 rounded text-slate-700 hover:text-slate-900 ${
              editor.isActive("bulletList") ? "bg-slate-200 text-slate-900" : ""
            }`}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`hidden sm:inline-flex h-8 w-8 p-0 rounded text-slate-700 hover:text-slate-900 ${
              editor.isActive("orderedList") ? "bg-slate-200 text-slate-900" : ""
            }`}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`hidden md:inline-flex h-8 w-8 p-0 rounded text-slate-700 hover:text-slate-900 ${
              editor.isActive("blockquote") ? "bg-slate-200 text-slate-900" : ""
            }`}
            title="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </Button>
        </div>

        <div className="hidden md:block w-[1px] h-5 bg-slate-200 mx-1" />

        {/* GROUP 4: Alignment Dropdown (Desktop) */}
        <div className="hidden md:flex items-center gap-0.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded text-slate-700 hover:text-slate-900"
                title="Text Alignment"
              >
                {editor.isActive({ textAlign: "center" }) ? (
                  <AlignCenter className="w-4 h-4" />
                ) : editor.isActive({ textAlign: "right" }) ? (
                  <AlignRight className="w-4 h-4" />
                ) : editor.isActive({ textAlign: "justify" }) ? (
                  <AlignJustify className="w-4 h-4" />
                ) : (
                  <AlignLeft className="w-4 h-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-36 bg-white border-slate-200">
              <DropdownMenuItem
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
                className="flex items-center gap-2 text-xs"
              >
                <AlignLeft className="w-4 h-4" />
                <span>Left</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().setTextAlign("center").run()}
                className="flex items-center gap-2 text-xs"
              >
                <AlignCenter className="w-4 h-4" />
                <span>Center</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().setTextAlign("right").run()}
                className="flex items-center gap-2 text-xs"
              >
                <AlignRight className="w-4 h-4" />
                <span>Right</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                className="flex items-center gap-2 text-xs"
              >
                <AlignJustify className="w-4 h-4" />
                <span>Justify</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="w-[1px] h-5 bg-slate-200 mx-1" />

        {/* GROUP 5: Links, Images, Tables */}
        <div className="flex items-center gap-0.5">
          {/* Link Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={openLinkDialog}
            className={`h-8 w-8 p-0 rounded text-slate-700 hover:text-slate-900 ${
              editor.isActive("link") ? "bg-slate-200 text-slate-900" : ""
            }`}
            title="Insert or Edit Link"
          >
            <LinkIcon className="w-4 h-4" />
          </Button>

          {/* Image Upload Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isUploadingImage}
                className="h-8 w-8 p-0 rounded text-slate-700 hover:text-slate-900"
                title="Insert Image"
              >
                {isUploadingImage ? (
                  <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
                ) : (
                  <ImageIcon className="w-4 h-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 bg-white border-slate-200">
              <DropdownMenuItem
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 text-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload Image File</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setImageUrlDialogOpen(true)}
                className="flex items-center gap-2 text-xs cursor-pointer"
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Insert from Image URL</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Table Dropdown (Desktop & Mobile) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 rounded text-slate-700 hover:text-slate-900 ${
                  editor.isActive("table") ? "bg-slate-200 text-slate-900" : ""
                }`}
                title="Insert Table"
              >
                <TableIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52 bg-white border-slate-200">
              {!editor.isActive("table") ? (
                <DropdownMenuItem
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                      .run()
                  }
                  className="text-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-2" />
                  Insert Table (3 × 3)
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().addRowAfter().run()}
                    className="text-xs"
                  >
                    <Rows className="w-3.5 h-3.5 mr-2" />
                    Add Row Below
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().addRowBefore().run()}
                    className="text-xs"
                  >
                    <Rows className="w-3.5 h-3.5 mr-2" />
                    Add Row Above
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().deleteRow().run()}
                    className="text-xs text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-2" />
                    Delete Row
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().addColumnAfter().run()}
                    className="text-xs"
                  >
                    <Columns className="w-3.5 h-3.5 mr-2" />
                    Add Column After
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().addColumnBefore().run()}
                    className="text-xs"
                  >
                    <Columns className="w-3.5 h-3.5 mr-2" />
                    Add Column Before
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().deleteColumn().run()}
                    className="text-xs text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-2" />
                    Delete Column
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().toggleHeaderRow().run()}
                    className="text-xs"
                  >
                    Toggle Header Row
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().deleteTable().run()}
                    className="text-xs text-red-600 focus:text-red-600 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-2" />
                    Delete Table
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* GROUP 6: Text Color & Highlight (Desktop) */}
        <div className="hidden lg:flex items-center gap-0.5">
          <div className="w-[1px] h-5 bg-slate-200 mx-1" />

          {/* Color Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded text-slate-700 hover:text-slate-900"
                title="Text Color"
              >
                <Palette className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-48 p-2 bg-white border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider font-mono">
                Text Color
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {TEXT_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => editor.chain().focus().setColor(c.value).run()}
                    className="flex items-center gap-1.5 p-1 rounded hover:bg-slate-100 text-left text-xs"
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-slate-300 inline-block shrink-0"
                      style={{ backgroundColor: c.value }}
                    />
                    <span className="truncate text-[11px]">{c.label}</span>
                  </button>
                ))}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().unsetColor().run()}
                className="w-full mt-2 text-[11px] h-7 text-slate-500 hover:text-slate-900 font-mono"
              >
                Reset Color
              </Button>
            </PopoverContent>
          </Popover>

          {/* Highlight Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 rounded text-slate-700 hover:text-slate-900 ${
                  editor.isActive("highlight") ? "bg-slate-200 text-slate-900" : ""
                }`}
                title="Highlight Text"
              >
                <Highlighter className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-44 p-2 bg-white border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider font-mono">
                Highlight
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {HIGHLIGHT_COLORS.map((h) => (
                  <button
                    key={h.value}
                    type="button"
                    onClick={() => editor.chain().focus().setHighlight({ color: h.value }).run()}
                    className="flex items-center gap-1.5 p-1.5 rounded hover:bg-slate-100 text-left text-xs"
                  >
                    <span
                      className="w-3.5 h-3.5 rounded border border-slate-300 inline-block shrink-0"
                      style={{ backgroundColor: h.value }}
                    />
                    <span className="text-[11px]">{h.label}</span>
                  </button>
                ))}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().unsetHighlight().run()}
                className="w-full mt-2 text-[11px] h-7 text-slate-500 hover:text-slate-900 font-mono"
              >
                Remove Highlight
              </Button>
            </PopoverContent>
          </Popover>

          {/* Clear Formatting */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
            className="h-8 w-8 p-0 rounded text-slate-700 hover:text-slate-900"
            title="Clear Formatting"
          >
            <RemoveFormatting className="w-4 h-4" />
          </Button>
        </div>

        {/* GROUP 7: Undo / Redo (Desktop) */}
        <div className="hidden lg:flex items-center gap-0.5 ml-auto">
          <div className="w-[1px] h-5 bg-slate-200 mx-1" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="h-8 w-8 p-0 rounded text-slate-700 disabled:opacity-30"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="h-8 w-8 p-0 rounded text-slate-700 disabled:opacity-30"
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </Button>
        </div>

        {/* MOBILE / OVERFLOW "MORE" MENU */}
        <div className="lg:hidden ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded text-slate-700 hover:text-slate-900 border border-slate-200 bg-white"
                title="More Tools"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white border-slate-200">
              <DropdownMenuItem
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className="text-xs flex items-center justify-between"
              >
                <span>Strikethrough</span>
                <Strikethrough className="w-3.5 h-3.5 text-slate-400" />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().toggleCode().run()}
                className="text-xs flex items-center justify-between"
              >
                <span>Inline Code</span>
                <Code className="w-3.5 h-3.5 text-slate-400" />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className="text-xs flex items-center justify-between"
              >
                <span>Numbered List</span>
                <ListOrdered className="w-3.5 h-3.5 text-slate-400" />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className="text-xs flex items-center justify-between"
              >
                <span>Blockquote</span>
                <Quote className="w-3.5 h-3.5 text-slate-400" />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className="text-xs flex items-center justify-between"
              >
                <span>Code Block</span>
                <Code className="w-3.5 h-3.5 text-slate-400" />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className="text-xs flex items-center justify-between"
              >
                <span>Horizontal Line</span>
                <span className="text-slate-400 text-xs">—</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Text Align Submenu */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="text-xs">
                  <span>Alignment</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-36 bg-white border-slate-200">
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    className="text-xs flex items-center gap-2"
                  >
                    <AlignLeft className="w-3.5 h-3.5" /> Left
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    className="text-xs flex items-center gap-2"
                  >
                    <AlignCenter className="w-3.5 h-3.5" /> Center
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    className="text-xs flex items-center gap-2"
                  >
                    <AlignRight className="w-3.5 h-3.5" /> Right
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                    className="text-xs flex items-center gap-2"
                  >
                    <AlignJustify className="w-3.5 h-3.5" /> Justify
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              {/* Color Highlight Submenu */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="text-xs">
                  <span>Color & Highlight</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-44 bg-white border-slate-200">
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().setColor("#ea580c").run()}
                    className="text-xs text-orange-600 font-medium"
                  >
                    Brand Orange Text
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().setColor("#0f172a").run()}
                    className="text-xs"
                  >
                    Default Dark Text
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().setHighlight({ color: "#fef08a" }).run()}
                    className="text-xs"
                  >
                    Yellow Highlight
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().setHighlight({ color: "#fed7aa" }).run()}
                    className="text-xs"
                  >
                    Orange Highlight
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().unsetHighlight().run()}
                    className="text-xs text-slate-500"
                  >
                    Clear Highlight
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                className="text-xs flex items-center justify-between text-slate-600"
              >
                <span>Clear Formatting</span>
                <RemoveFormatting className="w-3.5 h-3.5" />
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <div className="flex items-center justify-between px-2 py-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().undo()}
                  className="h-7 text-xs gap-1"
                >
                  <Undo className="w-3 h-3" /> Undo
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().redo()}
                  className="h-7 text-xs gap-1"
                >
                  <Redo className="w-3 h-3" /> Redo
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* EDITOR CANVAS */}
      <div className="relative min-h-[180px] bg-white cursor-text">
        <EditorContent editor={editor} />
      </div>

      {/* LINK DIALOG */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-slate-900">
              Insert or Edit Link
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="link-url" className="text-xs font-semibold text-slate-700">
                URL Destination
              </Label>
              <Input
                id="link-url"
                placeholder="https://example.com/spec or mailto:..."
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="h-9 text-sm bg-white border-slate-200"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleApplyLink();
                  }
                }}
              />
            </div>
            {editor.isActive("link") && (
              <div className="flex items-center justify-between pt-1">
                <a
                  href={editor.getAttributes("link").href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-orange-600 hover:underline flex items-center gap-1 font-mono"
                >
                  <ExternalLink className="w-3 h-3" />
                  Test current link
                </a>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveLink}
                  className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Unlink className="w-3 h-3 mr-1" />
                  Remove Link
                </Button>
              </div>
            )}
          </div>
          <DialogFooter className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setLinkDialogOpen(false)}
              className="h-8 text-xs font-mono"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleApplyLink}
              className="h-8 text-xs font-mono bg-slate-900 text-white hover:bg-slate-800"
            >
              Apply Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* INSERT IMAGE VIA URL DIALOG */}
      <Dialog open={imageUrlDialogOpen} onOpenChange={setImageUrlDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-slate-900">
              Insert Image by URL
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="image-url" className="text-xs font-semibold text-slate-700">
                Image Web Address (URL) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="image-url"
                placeholder="https://images.example.com/architecture.png"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                className="h-9 text-sm bg-white border-slate-200"
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="image-alt" className="text-xs font-semibold text-slate-700">
                Alt Text (Accessibility)
              </Label>
              <Input
                id="image-alt"
                placeholder="Brief description of the graphic"
                value={customImageAlt}
                onChange={(e) => setCustomImageAlt(e.target.value)}
                className="h-9 text-sm bg-white border-slate-200"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="image-caption" className="text-xs font-semibold text-slate-700">
                Optional Caption
              </Label>
              <Input
                id="image-caption"
                placeholder="Figure 1: Current data flow"
                value={customImageCaption}
                onChange={(e) => setCustomImageCaption(e.target.value)}
                className="h-9 text-sm bg-white border-slate-200"
              />
            </div>
          </div>
          <DialogFooter className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setImageUrlDialogOpen(false)}
              className="h-8 text-xs font-mono"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleInsertImageUrl}
              disabled={!customImageUrl.trim()}
              className="h-8 text-xs font-mono bg-slate-900 text-white hover:bg-slate-800"
            >
              Insert Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
