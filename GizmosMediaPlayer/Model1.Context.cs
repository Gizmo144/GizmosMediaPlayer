﻿//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MyMediaPlayer
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class MyMediaDataBaseEntities1 : DbContext
    {
        public MyMediaDataBaseEntities1()
            : base("name=MyMediaDataBaseEntities1")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<MyMediaAlbum> MyMediaAlbums { get; set; }
        public DbSet<MyMediaArtist> MyMediaArtists { get; set; }
        public DbSet<MyMediaTable> MyMediaTables { get; set; }
    }
}
