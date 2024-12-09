import { twMerge } from "tailwind-merge"

const common = {
    button: "py-3 px-3.5 cursor-pointer rounded-md",
}
export const form = {
    root: "flex flex-col gap-4 p-2",
    row: "flex flex-col gap-2",
    label: "font-bold uppercase text-xs text-[var(--muted)]",
    input: "bg-white/25 py-2.5 px-2 rounded",
    error: "text-red-500 text-sm ",
    actions: "flex justify-end gap-2 pt-4",
    submit: twMerge(common.button, "bg-[var(--accent)] flex-1"),
    reset: twMerge(common.button, "bg-[var(--muted)]"),
}