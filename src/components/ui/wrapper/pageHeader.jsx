export const PageHeaderWrapper = ({ children, className }) => {
  return (
    <div
      className={`${className} flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 pb-6`}
    >
      {children}
    </div>
  );
};
