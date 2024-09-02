type Texture = {
    id: string
    href: string
    widthIn: number
    heightIn: number
}

// Some Vite magic allows us to avoid writing out the imports manually:
// https://vitejs.dev/guide/features.html#glob-import
const images = import.meta.glob("./*.avif", {
    query: "?url",
    eager: true,
    import: "default",
}) as { [key: string]: string }

export const TEXTURES: Texture[] = [
    {
        id: "raw-walnut",
        href: images["./raw-walnut.avif"],
        widthIn: 9,
        heightIn: 7 / 16,
    },
    {
        id: "red-oak1",
        href: images["./red-oak1.avif"],
        widthIn: 9,
        heightIn: 1 + 7 / 8,
    },
    {
        id: "red-oak2",
        href: images["./red-oak2.avif"],
        widthIn: 5,
        heightIn: 1 / 2,
    },
]
