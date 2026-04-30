import type { BlockProps, BlockData } from '../renderer/block.types';

interface ButtonItem {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

type ButtonGroupBlockData = BlockData<{
  type: 'buttongroup';
  buttons?: ButtonItem[] | null;
}>;

export function ButtonGroupBlock({ block }: BlockProps<ButtonGroupBlockData>) {
  if (!block.buttons?.length) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {block.buttons.map((button, index) => (
        <a
          key={index}
          className={
            button.variant === 'secondary'
              ? 'rounded-lg border border-current px-4 py-2 text-sm font-medium hover:bg-gray-50'
              : 'rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700'
          }
          href={button.href}
        >
          {button.label}
        </a>
      ))}
    </div>
  );
}
