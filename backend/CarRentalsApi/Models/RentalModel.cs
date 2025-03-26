using System;
using UserAuthenticationApi.Models;

public class Rental
{
    public int Id { get; set; }
    public int CarId { get; set; }
    public virtual Car Car { get; set; }
    public int UserId { get; set; }
    public virtual User User { get; set; }
    public DateTime RentalDate { get; set; }
    public DateTime? ReturnDate { get; set; }
    public bool IsActive { get; internal set; }
}
