import Image from "next/image";
import { ChatWindow } from "./components/ChatWindow";

export default function Home() {
 return (
    // The <main> tag often serves as the root container.
    // The styles defined in ChatWindow (like h-screen) will ensure it fills the viewport.
    <main className="h-screen">
      <ChatWindow />
    </main>
  );
}
