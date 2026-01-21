import { Layout } from "#/components/layout";
import { Tag } from "#/components/tag";
import { colors } from "#/constants/color";

export default function Home() {
  return (
    <Layout.Root>
      <Layout.Header>
        <div className="ygi:h-layout-header-height ygi:bg-surface-gray ygi:flex ygi:items-center ygi:justify-center ygi:w-full">
          Header
        </div>
      </Layout.Header>
      <Layout.Content>
        <div className="ygi:h-80 ygi:bg-surface-white ygi:flex ygi:items-center ygi:gap-md ygi:justify-center ygi:w-full">
          <Tag>Tag (size (default) = medium)</Tag>
          <Tag size="small">Tag (size = small)</Tag>
          <Tag size="medium">Tag (size = medium)</Tag>     
        </div>
        <div className="ygi:h-80 ygi:bg-surface-primary ygi:flex ygi:items-center ygi:justify-center ygi:w-full">
          <h1 className="ygi:display-28-bd ygi:text-text-primary">section 1</h1>
        </div>
        <div className="ygi:h-80 ygi:bg-surface-secondary ygi:flex ygi:items-center ygi:justify-center ygi:w-full">
          <h1 className="ygi:display-28-bd ygi:text-text-primary">section 2</h1>
        </div>
        <div className="ygi:h-80 ygi:bg-button-secondary ygi:flex ygi:items-center ygi:justify-center ygi:w-full">
          <h1 className="ygi:display-28-bd ygi:text-text-inverse">section 3</h1>
        </div>
        <div className="ygi:h-80 ygi:bg-button-secondary-hover ygi:flex ygi:items-center ygi:justify-center ygi:w-full">
          <h1 className="ygi:display-28-bd ygi:text-text-inverse">section 4</h1>
        </div>

        {/* color 변수 기반 예시 */}
        <div
          className="ygi:h-80 ygi:flex ygi:items-center ygi:justify-center ygi:w-full"
          style={{ backgroundColor: colors.palette.primary[500] }}
        >
          <h1
            className="ygi:display-28-bd"
            style={{ color: colors.text.inverse }}
          >
            section 5 (colors 변수 사용)
          </h1>
        </div>
      </Layout.Content>
      <Layout.Footer>
        <div className="ygi:h-layout-footer-height ygi:bg-surface-gray ygi:flex ygi:items-center ygi:justify-center ygi:w-full">
          Footer
        </div>
      </Layout.Footer>
    </Layout.Root>
  );
}
