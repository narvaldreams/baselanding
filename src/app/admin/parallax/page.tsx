import { getParallax } from "@/actions/auth/parallax/get-parallax";
import { FormParallax, Wrapper } from "@/components";
import siteId from "@/utils/getSiteId";

export default async function ParallaxPage() {
  const parallax = await getParallax(siteId);

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">
            {parallax ? <FormParallax parallax={parallax} siteId={ siteId } /> : <FormParallax siteId={ siteId } />}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
