import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-background mt-8">
      <Separator className="mb-4"/>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 ">
        <p className="text-md  flex justify-center gap-2 text-muted-foreground text-center">
          <span>@ 2026</span>
          <span className="font-semibold text-foreground">B4U Movies</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
