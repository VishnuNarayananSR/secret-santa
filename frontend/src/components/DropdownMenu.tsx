import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu as NextDropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { PropsWithChildren } from "react";
type Option<T> = {
  key: string;
  value: T;
};
type Props<T> = PropsWithChildren<{
  items: Option<T>[];
  onSelect: (item?: Option<T>) => void;
}>;

export default function DropdownMenu<T extends string>({
  children,
  items,
  onSelect,
}: Props<T>) {
  return (
    <Dropdown>
      <DropdownTrigger>{children}</DropdownTrigger>
      <NextDropdownMenu
        selectionMode="single"
        items={items}
        variant="flat"
        onAction={(key) => {
          const selected = items.find((it) => it.key === key);
          onSelect(selected);
        }}
      >
        {(item) => (
          <DropdownItem
            key={item.key}
            className={item.key === "delete" ? "text-danger" : ""}
            color={item.key === "delete" ? "danger" : "default"}
          >
            {item.value}
          </DropdownItem>
        )}
      </NextDropdownMenu>
    </Dropdown>
  );
}
