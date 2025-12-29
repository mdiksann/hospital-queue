import React from "react"
import { createRoot } from "react-dom/client"
import QueueScreen from "./pages/QueueScreen"
import "./bootstrap"

const container = document.getElementById("app")

if (container) {
    createRoot(container).render(<QueueScreen />)
}