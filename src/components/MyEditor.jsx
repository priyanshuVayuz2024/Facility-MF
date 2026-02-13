import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { stripHtml, uploadDocuments } from "../utils";

export const MyEditor = ({
  value,
  height,
  setValue,
  minLength = 10,
  maxLength = 3000,
  required = false,
  validateOnChange = true,
  onBlur,
  className,
  ...props
}) => {
  const quillRef = useRef();
  const [error, setError] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  const validate = (content) => {
    const plainText = quillRef.current
      ? stripHtml(quillRef.current.getEditor().getText())
        .replace(/\s+/g, " ")
        .trim()
      : "";

    if (required && plainText.length === 0) {
      return "Description is required.";
    } else if (plainText.length < minLength) {
      return `Description should be at least ${minLength} characters long.`;
    } else if (maxLength && plainText.length > maxLength) {
      return `Description should be less than ${maxLength} characters.`;
    }
    return "";
  };

  // Handle change event with user interaction detection and validation
  const handleChange = (content) => {
    setValue(content);

    if (!hasInteracted) {
      const plainText = stripHtml(quillRef.current?.getEditor().getText() || "")
        .replace(/\s+/g, " ")
        .trim();
      if (plainText.length > 0) {
        setHasInteracted(true);
      }
    }

    if (validateOnChange && hasInteracted) {
      const errorMsg = validate(content);
      setError(errorMsg);
    }
  };

  // Handle blur validation
  const handleBlur = () => {
    const errorMsg = validate(value);
    setError(errorMsg);
    if (onBlur) onBlur();
  };

  // Toolbar image handler for uploading images manually
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        return;
      }

      try {
        const uploadedRes = await uploadDocuments([file]); // expects array
        const s3Url = uploadedRes?.data?.file_upload?.details?.[0]?.file_url;

        if (!s3Url) {
          return;
        }

        const editor = quillRef.current?.getEditor();
        const range = editor?.getSelection(true);

        if (editor && range) {
          editor.insertEmbed(range.index, "image", s3Url);
          editor.setSelection(range.index + 1);
        }
      } catch (error) {
        console.error("S3 Upload Error:", error);
      }
    };
  };

  // Quill modules configuration including toolbar and image handler
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        [{ color: [] }, { background: [] }],
        ["blockquote", "code-block"],
        ["link", "image", "video", "formula"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  // useEffect to block image pasting by intercepting paste event
  useEffect(() => {
    const attachPasteBlocker = () => {
      const quill = quillRef.current?.getEditor?.();
      if (quill && quill.root) {
        const editorElement = quill.root;

        const handlePaste = (e) => {
          const clipboardData = e.clipboardData || window.clipboardData;
          if (!clipboardData) return;

          const items = clipboardData.items;
          if (!items) return;

          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.kind === "file" && item.type.startsWith("image/")) {
              e.preventDefault();
              // Optional: alert or toast to user here
              return;
            }
          }
        };

        editorElement.addEventListener("paste", handlePaste);

        return () => {
          editorElement.removeEventListener("paste", handlePaste);
        };
      }
      return null;
    };

    let cleanupFn = null;
    const interval = setInterval(() => {
      const cleanup = attachPasteBlocker();
      if (cleanup) {
        cleanupFn = cleanup;
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (cleanupFn) cleanupFn();
    };
  }, []);

  return (
    <div className="relative">
      <ReactQuill
        style={{ fontFamily: "Outfit" }}
        className={`bg-[#FAFAFA] pr-[100px] relative flex flex-col-reverse border-[0.5px] rounded! ${error ? "border-[#AB0000]" : "border-[#EBEBEB] hover:border-[#884EA7]"
          } ${className}`}
        ref={quillRef}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        modules={modules}
        theme="snow"
        {...props}
      />
      <span
        className={`absolute right-2 top-2 text-[14px] ${stripHtml(value)?.length >= maxLength
          ? "text-[#AB0000]"
          : "text-[#ADADAD]"
          }`}
      >
        {stripHtml(value)?.length} / {maxLength}
      </span>
      {error && <div className="ps-4 text-[#AB0000] text-xs mt-1">{error}</div>}
    </div>
  );
};
