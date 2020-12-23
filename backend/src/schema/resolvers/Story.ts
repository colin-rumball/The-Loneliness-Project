import { objectType } from "nexus";

const Story = objectType({
   name: "Story",
   definition(t) {
      t.id("id");
      t.int("id");
      t.string("name");
      t.string("age");
      t.string("mostLonely");
      t.string("lonelinessMeans");
      t.string("firstTime");
      t.string("lastTime");
      t.boolean("published");
      t.string("searchField");
      t.int("userId");
   }
});

export default Story;
