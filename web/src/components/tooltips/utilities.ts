export const getSafeTooltipPosition = (
  mousePositionX: number,
  mousePositionY: number,
  screenWidth: number,
  tooltipWidth: number,
  tooltipHeight: number
) => {
  const ToolTipFlipBoundaryX = tooltipWidth + 30;
  const ToolTipFlipBoundaryY = tooltipHeight - 40;
  const xOffset = 10;
  const yOffset = tooltipHeight - 40;

  const tooltipPosition = {
    x: mousePositionX + xOffset,
    y: mousePositionY - yOffset,
  };
  if (screenWidth - mousePositionX < ToolTipFlipBoundaryX) {
    tooltipPosition.x = mousePositionX - tooltipWidth;
  }
  if (mousePositionY < ToolTipFlipBoundaryY) {
    tooltipPosition.y = mousePositionY;
  }

  return tooltipPosition;
};

export const getOffsetTooltipPosition = ({
  mousePositionX,
  mousePositionY,
  tooltipHeight,
  isMinSM,
}: {
  mousePositionX: number;
  mousePositionY: number;
  tooltipHeight: number;
  isMinSM: boolean;
}) => {
  const xOffset = 10;
  const yOffset = tooltipHeight - 40;

  // For smaller screens we translate the tooltip to the top
  if (!isMinSM) {
    return {
      x: 0,
      y: 40, // Provides space for the header to still be visible
    };
  }

  const tooltipPosition = {
    x: mousePositionX + xOffset,
    y: mousePositionY - yOffset,
  };

  return tooltipPosition;
};
