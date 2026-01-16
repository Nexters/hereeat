import { BaseLayout } from "#/src/components/layout";

export default function Home() {
  return (
    <BaseLayout>
      <div className="ygi:h-80 ygi:bg-palette-primary-300 ygi:flex ygi:items-center ygi:justify-center ygi:w-full">
        <h1 className="ygi:display-28-bd ygi:text-gray-900">section 1</h1>
      </div>
      <div className="ygi:h-80 ygi:bg-palette-primary-400 ygi:flex ygi:items-center ygi:justify-center ygi:w-full">
        <h1 className="ygi:display-28-bd ygi:text-gray-900">section 2</h1>
      </div>
      <div className="ygi:h-80 ygi:bg-palette-primary-500 ygi:flex ygi:items-center ygi:justify-center ygi:w-full">
        <h1 className="ygi:display-28-bd ygi:text-gray-900">section 3</h1>
      </div>
      <div className="ygi:h-80 ygi:bg-palette-primary-600 ygi:flex ygi:items-center ygi:justify-center ygi:w-full">
        <h1 className="ygi:display-28-bd ygi:text-gray-900">section 4</h1>
      </div>
    </BaseLayout>
  );
}
