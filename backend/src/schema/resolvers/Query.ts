import { objectType, stringArg } from "@nexus/schema";
import axios from "axios";
import cheerio from "cheerio";

const Query = objectType({
   name: "Query",
   definition(t) {
      t.crud.user();
      t.crud.story();
      t.crud.stories();
      t.field("quote", {
         type: "Float",
         args: {
            ticker: stringArg({
               required: true,
               description: "ticker of security",
            }),
         },
         resolve: async (root, { ticker }) => {
            const res = await axios.get(`https://web.tmxmoney.com/quote.php?qm_symbol=${ticker}`);
            const $ = cheerio.load(res.data);
            const text = $("span.price span").text();
            return parseFloat(text);
         },
      });
   },
});

export default Query;
