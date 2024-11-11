export function generateDeviceToken() {
  // This function will generate a token used when logging on.
  // Returns a string representing the token.

  let rands = [];
  for (let i = 0; i < 16; i++) {
    let r = Math.random();
    let rand = 4294967296.0 * r;
    rands.push((rand >> ((3 & i) << 3)) & 255);
  }

  let hexa = [];
  for (let i = 0; i < 256; i++) {
    hexa.push((i + 256).toString(16).slice(1));
  }

  let id = "";
  for (let i = 0; i < 16; i++) {
    id += hexa[rands[i]];

    if (i === 3 || i === 5 || i === 7 || i === 9) {
      id += "-";
    }
  }
  return id;
}
