import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        font-size: 14px;
    }

    body {
        font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
        background: ${(props) => props.theme.bgPrimary};
        color: ${(props) => props.theme.textPrimary};
        overflow: hidden;
        height: 100vh;
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    button {
        border: none;
        background: none;
        cursor: pointer;
        font-family: inherit;
        transition: all 0.2s ease;
    }

    input {
        font-family: inherit;
    }

    a {
        color: inherit;
        text-decoration: none;
    }
`;
