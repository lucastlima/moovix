type HeadlineProps = {
  children?: React.ReactNode;
};

export function Headline({ children }: HeadlineProps) {
  return (
    <h1 className="w-full text-center text-2xl font-bold uppercase">
      {children}
    </h1>
  );
}
