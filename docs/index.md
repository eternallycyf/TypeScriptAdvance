---
title: TypeScript Advance
hero:
  title: TypeScript
  description: 深入浅出 TypeScript
  actions:
    - text: Start
      link: /guide
    - text: guide
      link: /guide
---

<code src="./components/home-page.tsx" inline="true"></code>

```tsx | demo
/**
 * inline: true
 */
import Contributor from './site/Contributor';
import { Section } from './site/Section';
import './site/styles.less';

export default () => (
  <Section
    title="Thanks to all contributors~"
    style={{ marginTop: 140 }}
    titleStyle={{
      paddingBottom: 20,
      fontWeight: 'bold',
      fontSize: 50,
      textAlign: 'center',
      color: 'black',
    }}
  >
    <Contributor />
  </Section>
);
```
