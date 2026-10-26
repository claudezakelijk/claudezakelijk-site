// Markdown kent geen <caption>. Conventie in content-bestanden: een losse alinea
// "Tabel: <bijschrift met stand-datum>" direct boven een tabel wordt het bijschrift.
import { visit } from 'unist-util-visit';
const tekstVan = (n) => (n.type === 'text' ? n.value : (n.children || []).map(tekstVan).join(''));
export default function rehypeTabelCaption() {
  return (tree) => {
    // Zonder type-filter: de alinea staat meestal direct onder 'root', dat geen element is.
    visit(tree, (node) => {
      if (!node.children) return;
      for (let i = 0; i < node.children.length; i++) {
        const p = node.children[i];
        if (p.type !== 'element' || p.tagName !== 'p') continue;
        const tekst = tekstVan(p).trim();
        if (!tekst.startsWith('Tabel: ')) continue;
        let j = i + 1;
        while (node.children[j] && node.children[j].type === 'text' && !node.children[j].value.trim()) j++;
        const t = node.children[j];
        if (!t || t.type !== 'element' || t.tagName !== 'table') continue;
        t.children.unshift({ type: 'element', tagName: 'caption', properties: {}, children: [{ type: 'text', value: tekst.slice(7) }] });
        node.children.splice(i, 1);
        i--;
      }
    });
  };
}
