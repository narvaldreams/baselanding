import { getSiteAbout } from "@/actions/auth/about/get-about";
import { getParallax } from "@/actions/auth/parallax/get-parallax";
import { FormAbout, FormParallax, Wrapper } from "@/components";

export default async function ParallaxPage() {
  const parallax = await getParallax();

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">
            {parallax ? <FormParallax parallax={parallax} /> : <FormParallax />}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
