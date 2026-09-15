import React from "react";

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

interface KnowledgeContentRendererProps {
  contentJson?: string | null;
  plainTextFallback?: string | null;
  className?: string;
}

function sanitizeUrl(url?: string): string {
  if (!url) return "#";
  const trimmed = url.trim();
  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("./") ||
    trimmed.startsWith("../")
  ) {
    return trimmed;
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:" || parsed.protocol === "mailto:") {
      return parsed.href;
    }
  } catch {
    // Malformed URL
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
        element = <strong key={markKey} className="font-bold text-slate-900">{element}</strong>;
        break;
      case "italic":
        element = <em key={markKey} className="italic text-slate-800">{element}</em>;
        break;
      case "underline":
        element = <u key={markKey} className="underline underline-offset-3">{element}</u>;
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
            className="text-orange-600 underline underline-offset-3 hover:text-orange-700 decoration-orange-300 hover:decoration-orange-600 transition-colors"
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

function renderNode(node: TiptapNode, key: React.Key): React.ReactNode {
  // Reject video or iframe nodes strictly
  if (
    node.type === "video" ||
    node.type === "youtube" ||
    node.type === "iframe" ||
    node.type === "embed"
  ) {
    return null;
  }

  // Text leaf node
  if (node.type === "text") {
    return renderTextWithMarks(node, key);
  }

  const children = (node.content || []).map((child, index) =>
    renderNode(child, `${key}-${index}`),
  );

  const textAlign = node.attrs?.textAlign;
  const alignClass =
    textAlign === "center"
      ? "text-center"
      : textAlign === "right"
        ? "text-right"
        : textAlign === "justify"
          ? "text-justify"
          : "";

  switch (node.type) {
    case "paragraph":
      return (
        <p
          key={key}
          className={`leading-relaxed text-slate-700 my-4 text-base ${alignClass}`}
        >
          {children.length > 0 ? children : <br />}
        </p>
      );

    case "heading": {
      const level = node.attrs?.level || 1;
      const validLevel = Math.min(Math.max(level, 1), 6);
      const headingStyles: Record<number, string> = {
        1: "text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-8 mb-4",
        2: "text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-7 mb-3 pb-1 border-b border-slate-100",
        3: "text-lg sm:text-xl font-semibold tracking-tight text-slate-900 mt-6 mb-2.5",
        4: "text-base sm:text-lg font-semibold text-slate-900 mt-5 mb-2",
        5: "text-sm sm:text-base font-semibold text-slate-900 mt-4 mb-1.5",
        6: "text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 mt-4 mb-1",
      };
      const headingClass = `${headingStyles[validLevel] || headingStyles[2]} ${alignClass}`;
      if (validLevel === 1) return <h1 key={key} className={headingClass}>{children}</h1>;
      if (validLevel === 2) return <h2 key={key} className={headingClass}>{children}</h2>;
      if (validLevel === 3) return <h3 key={key} className={headingClass}>{children}</h3>;
      if (validLevel === 4) return <h4 key={key} className={headingClass}>{children}</h4>;
      if (validLevel === 5) return <h5 key={key} className={headingClass}>{children}</h5>;
      return <h6 key={key} className={headingClass}>{children}</h6>;
    }

    case "bulletList":
      return (
        <ul key={key} className="list-disc pl-6 my-4 space-y-2 text-slate-700 text-base">
          {children}
        </ul>
      );

    case "orderedList":
      return (
        <ol key={key} className="list-decimal pl-6 my-4 space-y-2 text-slate-700 text-base">
          {children}
        </ol>
      );

    case "listItem":
      return (
        <li key={key} className="leading-relaxed">
          {children}
        </li>
      );

    case "blockquote":
      return (
        <blockquote
          key={key}
          className="border-l-4 border-orange-400 bg-orange-50/40 px-4 py-3 my-5 italic text-slate-700 text-base rounded-r-sm"
        >
          {children}
        </blockquote>
      );

    case "codeBlock":
      return (
        <div key={key} className="my-5 rounded-md bg-slate-900 p-4 font-mono text-sm text-slate-100 overflow-x-auto shadow-xs border border-slate-800">
          <pre className="m-0 leading-relaxed font-mono">{children}</pre>
        </div>
      );

    case "horizontalRule":
      return <hr key={key} className="border-t border-slate-200 my-8" />;

    case "image": {
      const src = sanitizeUrl(node.attrs?.src);
      if (!src || src === "#") return null;
      const alt = node.attrs?.alt || "Knowledge Illustration";
      const caption = node.attrs?.caption;
      const alignment = node.attrs?.alignment || "center";

      const containerAlign =
        alignment === "left"
          ? "flex flex-col items-start mr-auto"
          : alignment === "right"
            ? "flex flex-col items-end ml-auto"
            : "flex flex-col items-center mx-auto";

      return (
        <figure key={key} className={`my-6 max-w-full ${containerAlign}`}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="rounded-md border border-slate-200/90 max-h-[500px] w-auto max-w-full object-contain shadow-xs"
          />
          {caption && (
            <figcaption className="text-xs text-slate-500 mt-2 text-center italic font-sans max-w-lg">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "table":
      return (
        <div key={key} className="my-6 overflow-x-auto rounded border border-slate-200 shadow-2xs">
          <table className="w-full text-left text-sm border-collapse bg-white">
            <tbody>{children}</tbody>
          </table>
        </div>
      );

    case "tableRow":
      return (
        <tr key={key} className="border-b border-slate-200 last:border-0 hover:bg-slate-50/50 transition-colors">
          {children}
        </tr>
      );

    case "tableHeader":
      return (
        <th
          key={key}
          className="bg-slate-50 px-4 py-2.5 font-semibold text-slate-800 border-r border-slate-200 last:border-0 text-xs uppercase tracking-wider font-mono"
        >
          {children}
        </th>
      );

    case "tableCell":
      return (
        <td
          key={key}
          className="px-4 py-2.5 text-slate-700 border-r border-slate-200 last:border-0 align-top"
        >
          {children}
        </td>
      );

    default:
      if (children.length > 0) {
        return <div key={key}>{children}</div>;
      }
      return null;
  }
}

export function KnowledgeContentRenderer({
  contentJson,
  plainTextFallback,
  className = "",
}: KnowledgeContentRendererProps) {
  // If structured JSON exists, parse and render
  if (contentJson && contentJson.trim()) {
    try {
      const doc = JSON.parse(contentJson);
      if (doc && doc.type === "doc" && Array.isArray(doc.content)) {
        return (
          <div className={`knowledge-prose ${className}`}>
            {doc.content.map((node: TiptapNode, index: number) =>
              renderNode(node, `root-${index}`),
            )}
          </div>
        );
      }
    } catch (e) {
      console.warn("[KnowledgeContentRenderer] Failed to parse contentJson, using fallback:", e);
    }
  }

  // Backward compatibility: Plain text fallback
  if (!plainTextFallback || !plainTextFallback.trim()) {
    return null;
  }

  const paragraphs = plainTextFallback.split(/\n{2,}/).filter((p) => p.trim());

  return (
    <div className={`space-y-4 text-base leading-relaxed text-slate-700 ${className}`}>
      {paragraphs.map((p, index) => (
        <p key={index} className="leading-relaxed">
          {p.split("\n").map((line, lIndex, arr) => (
            <React.Fragment key={lIndex}>
              {line}
              {lIndex < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      ))}
    </div>
  );
}
