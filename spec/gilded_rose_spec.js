var { Shop, Item } = require('../src/gilded_rose.js');
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });


  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 20, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });


  it("La qualité d'un item n'est jamais négative", function () {
    listItems.push(new Item("Aged Brie", 20, 30));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();
    var expected = [
      { sellIn: 19, quality: 0 },
      { sellIn: 19, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBeGreaterThan(testCase.quality);
    });
  
  })

  it("Une fois que la date de péremption est passée, la qualité se dégrade deux fois plus rapidement", function () {
    const gildedRose = new Shop([ new Item("Mana Cake", 14, 42)])
    const osef = new Shop([ new Item("Mana Cake", 14, 25)])
    let items = undefined;
    let osefItem = undefined
  
    
      for(let i = 0; i < 17; i++){
        items = gildedRose.updateQuality()
        osefItem = osef.updateQuality();
      }
      expect(items[0].quality).toEqual(22)
      expect(osefItem[0].quality).toEqual(5)
    
  })
});