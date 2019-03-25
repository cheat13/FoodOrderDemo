namespace FoodApi.Models
{
    public class Food
    {
        public string Id { get; set; }
        public string IdShop { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public double CookingTime { get; set; }
        public string Image { get; set; }
        public int Amount { get; set; }
        public string Comment { get; set; }
    }
}