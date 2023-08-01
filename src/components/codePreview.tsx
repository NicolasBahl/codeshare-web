import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { LuCopy, LuCheck } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

interface CodePreviewProps {
  code: string;
  language: string;
}
const CodePreview = ({ code, language }: CodePreviewProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // reset after 2 seconds
  };

  const fadeVariant = {
    hidden: { opacity: 0, transition: { duration: 0.3 } },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <div
      className="relative overflow-auto rounded bg-[#282c34] max-w-4xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setTimeout(() => setIsHovered(false), 300)}
    >
      <SyntaxHighlighter language={language} style={oneDark} >
        {code}
      </SyntaxHighlighter>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute right-2 top-2"
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <CopyToClipboard text={code} onCopy={onCopyText}>
              <button className="flex items-center justify-center rounded bg-gray-800 p-2 text-white hover:bg-gray-500">
                {isCopied ? (
                  <motion.div
                    variants={fadeVariant}
                    initial="hidden"
                    animate="visible"
                  >
                    <LuCheck />
                  </motion.div>
                ) : (
                  <LuCopy />
                )}
              </button>
            </CopyToClipboard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodePreview;
