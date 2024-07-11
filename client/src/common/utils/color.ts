import tinycolor from "tinycolor2";

export const generateAccents = (
    color: string,
    steps: number,
    lighten = true
) => {
    const accents = [];
    for (let i = 1; i <= steps; i++) {
        const accent = lighten
            ? tinycolor(color)
                  .lighten(i * 10)
                  .toString()
            : tinycolor(color)
                  .darken(i * 10)
                  .toString();
        accents.push(accent);
    }
    return accents;
};
