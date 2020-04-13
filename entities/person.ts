import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    TreeParent,
    TreeChildren,
    Tree,
  } from "typeorm";
  
  @Entity()
  @Tree("materialized-path")
  export default class Person extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;
  
    @Column({ nullable: true, type: "text" })
    public fullName?: string;

    @TreeParent()
    manager?: Person;
  
    @Column({ nullable: true, type: "uuid" })
    managerId?: string;

    @TreeChildren(/*{cascade:true}*/)
    reports: Person[];
  
    @Column({ nullable: true, type: "text" })
    title?: string;
  }
  