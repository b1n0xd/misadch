import logoImage from "@/assets/misad-logo.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-32 w-32",
    md: "h-44 w-44",
    lg: "h-64 w-64",
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoImage}
        alt="Misad - Soins infirmiers à domicile Genève"
        className={`${sizeClasses[size]} object-contain transition-transform hover:scale-105`}
      />
    </div>
  );
};

export default Logo;
