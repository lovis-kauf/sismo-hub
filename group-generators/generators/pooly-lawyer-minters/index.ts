import { ValueType, Tags, FetchedData } from "../../../src/topics/group";
import {
  GenerationFrequency,
  GroupGenerator,
} from "../../../src/topics/group-generator";
import { Group } from "../../../src/topics/group";

export default class extends GroupGenerator {
  generationFrequency = GenerationFrequency.Once;

  async generate(): Promise<Group[]> {
    const allPoolyGroup = await Group.store.latest("pooly-minters");

    const data: FetchedData = {};

    // filter only on value >= 2 (lawyer or judge to avoid doxing)
    for (const address in allPoolyGroup.data) {
      const groupData = await allPoolyGroup.data();
      if (groupData[address] >= 2) {
        data[address] = 1;
      }
    }

    return [
      new Group({
        name: "pooly-lawyer-minters",
        timestamp: this.context.timestamp,
        data,
        valueType: ValueType.Score,
        tags: [Tags.Mainnet, Tags.Asset, Tags.NFT],
      }),
    ];
  }
}
