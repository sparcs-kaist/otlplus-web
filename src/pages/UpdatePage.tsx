import { NotionRenderer } from 'react-notion';

import { useEffect, useState } from 'react';

import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import { appBoundClassNames as classNames } from '@/common/boundClassNames';

const UpdatePage = () => {
  const [blockMap, setBlockMap] = useState(null);
  const query = new URLSearchParams(window.location.search);
  const pageId = query.get('pageId') || '23ac25603b0b80f8b343d2324a7e2131';
  const [spaceId, setSpaceId] = useState('');

  useEffect(() => {
    const fetchNotionData = async () => {
      const res = await fetch(`https://notion-api.splitbee.io/v1/page/${pageId}`);
      const json = await res.json();
      Object.keys(json).forEach((key) => {
        if (json[key].role === 'none') {
          delete json[key];
        } else {
          setSpaceId(json[key].value.space_id);
        }
      });
      setBlockMap(json);
    };
    fetchNotionData();
  }, []);
  useEffect(() => {
    if (spaceId !== '' && spaceId !== 'ca8b3bc6-6b17-4a1f-8f57-2dd4b58a84f7') {
      window.location.href = '/update';
    }
  }, [spaceId]);

  return (
    <section className={classNames('content', 'content--no-scroll')}>
      {blockMap !== null && spaceId === 'ca8b3bc6-6b17-4a1f-8f57-2dd4b58a84f7' && (
        <NotionRenderer
          blockMap={blockMap}
          fullPage={true}
          hideHeader={true}
          mapPageUrl={(pageId) => {
            return '/update?' + new URLSearchParams({ pageId: pageId });
          }}
        />
      )}
    </section>
  );
};

export default UpdatePage;
