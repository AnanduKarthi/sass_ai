import Image from "next/image";

export default function Loader() {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center ">
      <div className="h-10 w-10 relative animate-spin">
        <Image alt="logo" src="/logo.png" fill />
      </div>
      <p className="text-sm text-muted-foreground text-center">
        Genius is thinking...
      </p>
    </div>
  );
}
