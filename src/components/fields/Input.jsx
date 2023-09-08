export function Input({ label, type, ...props }) {
  return (
    <div className="!z-10 flex h-max w-full items-center justify-between  py-2 text-base">
      <label className="self-start text-sm capitalize text-white">{label}</label>
      <input
        type={type || "text"}
        className="!z-20 min-h-[30px] w-[50%] rounded-md border-2 border-secondary/60 text-center text-secondary  shadow-md focus:border-principal"
        {...props}
      />
    </div>
  );
}
