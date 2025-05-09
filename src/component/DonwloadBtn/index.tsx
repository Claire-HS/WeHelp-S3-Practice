import { TextInput, Select, Button, Divider, NumberInput } from "@mantine/core";
export default function DonwloadBtn({
  isLoading,
  onDownload,
}: {
  isLoading: boolean;
  onDownload: () => void;
}) {
  return (
    <Button variant="filled" loading={isLoading} onClick={onDownload}>
      {isLoading ? "下載中..." : "下載"}
    </Button>
  );
}
