export function htmlEscape(str: string) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/>/g, "&gt;")
        .replace(/</g, "&lt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/`/g, "&#96;");
}

export function html(
    literalSections: TemplateStringsArray,
    ...substitutions: (string | string[])[]
): string {
    const raw = literalSections.raw;
    let result = "";

    substitutions.forEach((s, i) => {
        let literal = raw[i];

        if (Array.isArray(s)) {
            s = s.join("");
        }

        if (literal.endsWith("$")) {
            s = htmlEscape(s);
            literal = literal.slice(0, -1);
        }

        result += literal + s;
    });

    result += raw[raw.length - 1];

    return result;
}
