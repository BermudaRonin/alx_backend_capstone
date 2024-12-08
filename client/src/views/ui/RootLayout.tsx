
interface  Props {
    children?: React.ReactNode;

}
export default function RootLayout(props: Props) {
    return <div>
        <header>
            Auth card
        </header>
        <main>
            Main content card
            {props.children}
        </main>
    </div>
}