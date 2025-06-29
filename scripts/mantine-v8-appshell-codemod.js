module.exports = function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  let needsAppShell = false;

  // 1) Ajustar imports
  root
    .find(j.ImportDeclaration, { source: { value: '@mantine/core' } })
    .forEach(path => {
      path.value.specifiers = path.value.specifiers.filter(spec => {
        const name = spec.imported?.name;
        if (['Header', 'Navbar', 'Footer', 'Aside'].includes(name)) {
          needsAppShell = true;
          return false;
        }
        return true;
      });

      if (needsAppShell) {
        const hasAppShell = path.value.specifiers.some(
          spec => spec.imported?.name === 'AppShell',
        );
        if (!hasAppShell) {
          path.value.specifiers.push(j.importSpecifier(j.identifier('AppShell')));
        }
      }
    });

  // 2) Substituir tags JSX
  ['Header', 'Navbar', 'Footer', 'Aside'].forEach(tag => {
    root.findJSXElements(tag).forEach(path => {
      const node = path.node;
      node.openingElement.name = j.jsxMemberExpression(
        j.jsxIdentifier('AppShell'),
        j.jsxIdentifier(tag),
      );
      if (node.closingElement) {
        node.closingElement.name = j.jsxMemberExpression(
          j.jsxIdentifier('AppShell'),
          j.jsxIdentifier(tag),
        );
      }
      needsAppShell = true;
    });
  });

  return root.toSource();
};
