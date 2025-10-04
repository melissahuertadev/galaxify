type LoginProps = {
    onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl mb-4">Galaxify Admin</h1>
            <button
                onClick={onLogin}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Iniciar sesión con Google
            </button>
        </div>
    )
}