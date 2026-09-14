import React from "react";
import DOMPurify from "isomorphic-dompurify";

interface TiptapMark {
  type: string;
  attrs?: Record<string, any>;
}

interface TiptapNode {
  type: string;
  attrs?: Record<string, any>;
  content?: TiptapNode[];
  text?: string;
  marks?: TiptapMark[];
}

interface QuestionContentRendererProps {
  contentJson?: string | null;
  plainTextFallback?: string | null;
  className?: string;
}

function sanitizeUrl(url?: string): string {
  if (!url) return "#";
  const trimmed = url.trim();
  // Only allow http, https, mailto, or relative URLs
  if (/^(https?:\/\/|mailto:|\/)/i.test(trimmed)) {
    return DOMPurify.sanitize(trimmed);
  }
  return "#";
}

function renderTextWithMarks(node: TiptapNode, key: React.Key): React.ReactNode {
  let element: React.ReactNode = node.text || "";

  if (!node.marks || node.marks.length === 0) {
    return <React.Fragment key={key}>{element}</React.Fragment>;
  }

  // Wrap marks progressively
  node.marks.forEach((mark, i) => {
    const markKey = `${key}-m-${i}`;
    switch (mark.type) {
      case "bold":
        element = <strong key={markKey} className="font-semibold text-slate-900">{element}</strong>;
        break;
      case "italic":
        element = <em key={markKey} className="italic">{element}</em>;
        break;
      case "underline":
        element = <u key={markKey} className="underline underline-offset-2">{element}</u>;
        break;
      case "strike":
        element = <s key={markKey} className="line-through text-slate-500">{element}</s>;
        break;
      case "code":
        element = (
          <code
            key={markKey}
            className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-100 text-slate-800 font-mono text-[13px] border border-slate-200"
          >
            {element}
          </code>
        );
        break;
      case "textStyle":
        if (mark.attrs?.color) {
          element = (
            <span key={markKey} style={{ color: mark.attrs.color }}>
              {element}
            </span>
          );
        }
        break;
      case "highlight":
        element = (
          <mark
            key={markKey}
            style={{ backgroundColor: mark.attrs?.color || "#fef08a" }}
            className="px-1 py-0.2 rounded font-normal text-inherit"
          >
            {element}
          </mark>
        );
        break;
      case "link":
        const href = sanitizeUrl(mark.attrs?.href);
        element = (
          <a
            key={markKey}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 hover:text-orange-700 underline underline-offset-3 font-medium transition-colors cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            {element}
          </a>
        );
        break;
      default:
        break;
    }
  });

  return <React.Fragment key={key}>{element}</React.Fragment>;
}

function renderNode(node: TiptapNode, index: number): React.ReactNode {
  const key = `node-${node.type}-${index}`;
  const children = node.content ? node.content.map((child, i) => renderNode(child, i)) : null;
  const textAlign = node.attrs?.textAlign;
  const alignClass =
    textAlign === "center"
      ? "text-center"
      : textAlign === "right"
        ? "text-right"
        : textAlign === "justify"
          ? "text-justify"
          : "text-left";

  switch (node.type) {
    case "text":
      return renderTextWithMarks(node, key);

    case "paragraph":
      if (!node.content || node.content.length === 0) {
        return <p key={key} className="h-4" />;
      }
      return (
        <p key={key} className={`leading-relaxed text-slate-700 my-2.5 font-normal ${alignClass}`}>
          {children}
        </p>
      );

    case "heading": {
      const level = Math.min(Math.max(node.attrs?.level || 1, 1), 6);
      const headingClasses: Record<number, string> = {
        1: "text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-6 mb-3",
        2: "text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-5 mb-2.5",
        3: "text-lg sm:text-xl font-semibold tracking-tight text-slate-900 mt-4 mb-2",
        4: "text-base sm:text-lg font-semibold text-slate-900 mt-3 mb-1.5",
        5: "text-sm sm:text-base font-semibold text-slate-900 mt-3 mb-1",
        6: "text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-700 mt-2 mb-1",
      };
      const cls = `${headingClasses[level] || headingClasses[2]} ${alignClass}`;

      if (level === 1) return <h1 key={key} className={cls}>{children}</h1>;
      if (level === 2) return <h2 key={key} className={cls}>{children}</h2>;
      if (level === 3) return <h3 key={key} className={cls}>{children}</h3>;
      if (level === 4) return <h4 key={key} className={cls}>{children}</h4>;
      if (level === 5) return <h5 key={key} className={cls}>{children}</h5>;
      return <h6 key={key} className={cls}>{children}</h6>;
    }

    case "bulletList":
      return (
        <ul key={key} className="list-disc pl-5 my-3 space-y-1 text-slate-700">
          {children}
        </ul>
      );

    case "orderedList": {
      const start = node.attrs?.start || 1;
      return (
        <ol key={key} start={start} className="list-decimal pl-5 my-3 space-y-1 text-slate-700">
          {children}
        </ol>
      );
    }

    case "listItem":
      return (
        <li key={key} className="my-0.5 leading-relaxed">
          {children}
        </li>
      );

    case "blockquote":
      return (
        <blockquote
          key={key}
          className="border-l-3 border-orange-500 pl-4 py-1.5 my-3.5 bg-orange-50/30 rounded-r text-slate-700 italic text-sm sm:text-base"
        >
          {children}
        </blockquote>
      );

    case "codeBlock":
      return (
        <pre
          key={key}
          className="bg-slate-900 text-slate-100 p-4 rounded-md font-mono text-xs sm:text-sm overflow-x-auto my-3.5 border border-slate-800 leading-normal"
        >
          <code>{children}</code>
        </pre>
      );

    case "horizontalRule":
      return <hr key={key} className="my-6 border-t border-slate-200" />;

    case "image": {
      const src = sanitizeUrl(node.attrs?.src);
      const alt = node.attrs?.alt || "Question detail image";
      const caption = node.attrs?.title || node.attrs?.caption;
      const alignment = node.attrs?.alignment || "center";

      let containerClass = "my-4 flex flex-col";
      if (alignment === "left") {
        containerClass += " items-start";
      } else if (alignment === "right") {
        containerClass += " items-end";
      } else {
        containerClass += " items-center";
      }

      return (
        <figure key={key} className={containerClass}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="rounded-md border border-slate-200 max-h-[500px] object-contain shadow-xs bg-slate-50"
          />
          {caption && (
            <figcaption className="text-xs text-slate-500 text-center mt-1.5 font-mono">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "table":
      return (
        <div key={key} className="overflow-x-auto my-4 rounded-md border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white">
            <tbody>{children}</tbody>
          </table>
        </div>
      );

    case "tableRow":
      return (
        <tr key={key} className="border-b border-slate-200 last:border-0 hover:bg-slate-50/50">
          {children}
        </tr>
      );

    case "tableHeader":
      return (
        <th
          key={key}
          className="bg-slate-50 p-2.5 sm:p-3 font-semibold text-slate-900 border-r border-slate-200 last:border-0 text-xs uppercase tracking-wider font-mono"
        >
          {children}
        </th>
      );

    case "tableCell":
      return (
        <td key={key} className="p-2.5 sm:p-3 text-slate-700 border-r border-slate-200 last:border-0">
          {children}
        </td>
      );

    default:
      if (children) {
        return <div key={key}>{children}</div>;
      }
      return null;
  }
}

export function QuestionContentRenderer({
  contentJson,
  plainTextFallback,
  className = "",
}: QuestionContentRendererProps) {
  if (contentJson && contentJson.trim()) {
    try {
      const parsed = JSON.parse(contentJson);
      if (parsed && parsed.type === "doc" && Array.isArray(parsed.content)) {
        return (
          <div className={`relay-rich-content text-slate-700 font-sans ${className}`}>
            {parsed.content.map((node: TiptapNode, index: number) => renderNode(node, index))}
          </div>
        );
      }
    } catch {
      // JSON parse error, fall back gracefully to plain text below
    }
  }

  // Graceful fallback for legacy questions with plain text
  if (plainTextFallback && plainTextFallback.trim()) {
    return (
      <div className={`whitespace-pre-line text-slate-700 leading-relaxed font-normal ${className}`}>
        {plainTextFallback}
      </div>
    );
  }

  return null;
}
