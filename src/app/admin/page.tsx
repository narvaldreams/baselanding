import { Wrapper } from "@/components";
import HomePage from "./home/page";

export default async function Page() {  

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">
            <HomePage />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
