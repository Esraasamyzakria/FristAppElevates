import { information} from "./information";

export interface Adaptor {
  adapt(data:information):information
}
