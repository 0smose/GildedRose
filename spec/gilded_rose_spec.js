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

  describe("la qualité augmente par 3 quand il reste 5 jours ou moins (Aged Brie et Backstage passes)", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)])
    const backstagePasses = gildedRose.items[0]
  
    describe("Quality increases by 2 when there are 10 days or less.", () => {
      it("Increases in quality to 20", () => {
        for(let i = 0; i < 5; i++){
          gildedRose.updateQuality()
        }
        expect(backstagePasses.quality).toEqual(20)
        expect(backstagePasses.sellIn).toEqual(5)
      })
    })

    describe("Quality goes up by 3 when there are 5 days or less.", () => {
      it("Increases in quality to 35", () => {
        for(let i = 0; i < 5; i++){
          gildedRose.updateQuality()
        }
        expect(backstagePasses.quality).toEqual(35)
        expect(backstagePasses.sellIn).toEqual(0)
      })
    })
    
  })
  

  describe("la qualité de sulfuras ne se modifie pas", () => {
    const gildedRose = new Shop([
      new Item('Sulfuras, Hand of Ragnaros', 10, 20)])
      //new Item('Sulfuras, Hand of Ragnaros', 20, 10)])
    const sulfura = gildedRose.items[0]
    //const sulfura2 = gildedRose.items[1]
    it('quality remains the same', () => {
      for (let i = 0; i< 5; i++) {
        gildedRose.updateQuality()
      }
      expect(sulfura.quality).toEqual(20)
      //expect(sulfura2.quality).toEqual(20)
      
    })
  })
  
  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("Sulfuras, Hand of Ragnaros", 20, 51));


    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 20, quality: 51 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  // it("Conjured item decay twice", () => {
  //   istItems.push(new Item("random conjured item", 20, 30));

  //   const gildedRose = new Shop(listItems);
  //   const items = gildedRose.updateQuality();

  //   var expected = [ 
  //     { sellIn: 10, quality: 30}
  //   ];
  //   expected.forEach(function (testCase, idx) {
  //     expect(items[idx].quality).toBe(testCase.quality);
  //     expect(items[idx].sellIn).toBe(testCase.sellIn);
  //   });
  // })


});