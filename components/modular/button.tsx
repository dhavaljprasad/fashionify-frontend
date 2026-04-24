"use client"

export const ButtonPrimary = ({
  text,
  icon,
}: {
  text: string
  icon?: React.ReactNode
}) => {
  return (
    <div className="flex h-auto w-fit cursor-pointer items-center justify-center gap-2 bg-contrast px-4 py-2 transition-colors duration-200 hover:bg-accent">
      <span className="text-xs font-semibold text-background-primary">
        {text}
      </span>
      {icon && (
        <span className="text-xs font-semibold text-background-primary">
          {icon}
        </span>
      )}
    </div>
  )
}
