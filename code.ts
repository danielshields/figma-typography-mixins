// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);
figma.ui.resize(700, 500);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  if (msg.type === 'closeout') {
    figma.closePlugin();
  } else if (msg.type === 'get-fonts') {
    const allFonts = figma.getLocalTextStyles().map((style) => style.fontName.family);
    const allFontStyles = figma.getLocalTextStyles().map((style) => style);
    let allFontsArray = new Array();

    allFontStyles.forEach((style) => {
      // console.log(style);
      let font = {
        name: style.name,
        family: style.fontName.family,
        style: style.fontName.style,
        size: style.fontSize,
        letterSpacing: style.letterSpacing,
        lineHeight: style.lineHeight,
        textDecoration: style.textDecoration,
      }
      if(!allFontsArray.some(e => e.family === font.family && e.style === font.style && e.size === font.size)){
        allFontsArray.push(font);
      }
    });
    const uniqueFonts = [...new Set(allFonts)];
    const uniqueFontStyles = [...new Set(allFontStyles)];
    // console.log(uniqueFonts);

    figma.ui.postMessage({ type: 'font-list', fonts: uniqueFonts, fontStyles: uniqueFontStyles, allFontsArray: allFontsArray });
  } else {
      console.log('unknown message type');
      console.log(msg);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin();
};
// figma.ui.postMessage({ type: 'get-fonts' });