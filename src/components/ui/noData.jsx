export const NoData = ({
  containerClassName = "",
  imageClassName = "",
  className = "justify-center",
  showText = false,
  title = "No Data Found",
  description = "Please try again later or check back soon!",
  NoHtmlBlock = null,
}) => {
  return (
    <div
      className={`${containerClassName} py-12 w-full flex flex-col ${className} items-center text-center gap-6`}
    >
      <img
        className={`${imageClassName} w-60`}
        src={"/no-data.svg"}
        alt="Currently Unavailable"
      />
      {NoHtmlBlock}
      <div className="flex flex-col items-center gap-1">
        {
          <h4 className="text-xl! font-medium text-black dark:text-gray-300 ">{title}</h4>
        }
        {showText && (
          <>
            <p className="max-w-96 text-sm! dark:text-gray-500">{description}</p>
          </>
        )}
      </div>
    </div>
  );
};
