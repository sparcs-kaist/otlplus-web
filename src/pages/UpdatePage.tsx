import { NotionRenderer } from 'react-notion';

import { useEffect, useState } from 'react';

import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import { appBoundClassNames as classNames } from '@/common/boundClassNames';

const DEFAULT_PAGE_ID = '23ac25603b0b80f8b343d2324a7e2131';
const OFFICIAL_SPACE_ID = 'ca8b3bc6-6b17-4a1f-8f57-2dd4b58a84f7';

const UpdatePage = () => {
  const [blockMap, setBlockMap] = useState(null);
  const query = new URLSearchParams(window.location.search);
  const pageId = query.get('pageId') || DEFAULT_PAGE_ID;
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
    if (spaceId !== '' && spaceId !== OFFICIAL_SPACE_ID) {
      window.location.href = '/update';
    }
  }, [spaceId]);

  return (
    <section className={classNames('content', 'content--no-scroll')}>
      {blockMap !== null && spaceId === OFFICIAL_SPACE_ID && (
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
