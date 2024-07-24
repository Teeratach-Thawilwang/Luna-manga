import React, { useEffect, useState } from "react";

import styled from "styled-components";

import AddAudioButton from "@components/backoffice/richTextEditor/AddAudioButton";
import EditHistoryButton from "@components/backoffice/richTextEditor/EditHistoryButton";
import FontSelector from "@components/backoffice/richTextEditor/FontSelector";
import FontSizeSelector from "@components/backoffice/richTextEditor/FontSizeSelector";
import MarkFontStyleButton from "@components/backoffice/richTextEditor/MarkFontStyleButton";
import MarkTextAlignButton from "@components/backoffice/richTextEditor/MarkTextAlignButton";
import FormatAlignCenterIcon from "@components/iconSvg/FormatAlignCenterIcon";
import FormatAlignJustifyIcon from "@components/iconSvg/FormatAlignJustifyIcon";
import FormatAlignLeftIcon from "@components/iconSvg/FormatAlignLeftIcon";
import FormatAlignRightIcon from "@components/iconSvg/FormatAlignRightIcon";
import FormatBoldIcon from "@components/iconSvg/FormatBoldIcon";
import FormatItalicIcon from "@components/iconSvg/FormatItalicIcon";
import FormatUnderLineIcon from "@components/iconSvg/FormatUnderLineIcon";
import RedoIcon from "@components/iconSvg/RedoIcon";
import UndoIcon from "@components/iconSvg/UndoIcon";
import { MarkEditHistory, MarkFontStyle, MarkTextAlign } from "@enums/MarkFormat";

export default React.memo(function ToolbarBottom() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const component = document.getElementById("text-editor-toolbar-bottom");
      if (component) {
        const rect = component.getBoundingClientRect();
        if (rect.bottom > 0) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isVisible ? (
    <Box>
      <FontSelector />
      <FontSizeSelector />
      <EditHistoryButton format={MarkEditHistory.UNDO} icon={<UndoIcon />} />
      <EditHistoryButton format={MarkEditHistory.REDO} icon={<RedoIcon />} />
      <MarkFontStyleButton format={MarkFontStyle.BOLD} icon={<FormatBoldIcon />} />
      <MarkFontStyleButton format={MarkFontStyle.ITALIC} icon={<FormatItalicIcon />} />
      <MarkFontStyleButton format={MarkFontStyle.UNDERLINE} icon={<FormatUnderLineIcon />} />
      <MarkTextAlignButton format={MarkTextAlign.ALIGN_LEFT} icon={<FormatAlignLeftIcon />} />
      <MarkTextAlignButton format={MarkTextAlign.ALIGN_CENTER} icon={<FormatAlignCenterIcon />} />
      <MarkTextAlignButton format={MarkTextAlign.ALIGN_RIGHT} icon={<FormatAlignRightIcon />} />
      <MarkTextAlignButton format={MarkTextAlign.ALIGN_JUSTIFY} icon={<FormatAlignJustifyIcon />} />
      <AddAudioButton />
    </Box>
  ) : null;
});

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 50px;
  margin: 0px;
  padding: 0px;
  border-top: 2px solid #e3e3e3;

  display: flex;
  justify-content: start;
  align-items: center;

  /* background-color: #000; */
`;
