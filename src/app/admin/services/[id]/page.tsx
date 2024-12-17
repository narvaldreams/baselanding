import { Wrapper } from "@/components";
import { CreatedUpdating } from "../ui/CreatedUpdating";

export default async function ServicePage() {
  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">
            <CreatedUpdating />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
