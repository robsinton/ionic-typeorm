import {ManyToMany} from "../../../../../../src/decorator/relations/ManyToMany";
import {Entity} from "../../../../../../src/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "../../../../../../src/decorator/columns/PrimaryGeneratedColumn";
import {Column} from "../../../../../../src/decorator/columns/Column";
import {JoinTable} from "../../../../../../src/decorator/relations/JoinTable";
import {RelationId} from "../../../../../../src/decorator/relations/RelationId";
import {Category} from "./Category";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    isRemoved: boolean = false;

    @ManyToMany(type => Category, category => category.posts)
    @JoinTable()
    categories: Category[];

    @ManyToMany(type => Category)
    @JoinTable()
    subcategories: Category[];

    @RelationId((post: Post) => post.categories)
    categoryIds: number[];

    @RelationId((post: Post) => post.categories, "removedCategories", qb => qb.where("removedCategories.isRemoved = :isRemoved", { isRemoved: true }))
    removedCategoryIds: number[];

    @RelationId((post: Post) => post.subcategories)
    subcategoryIds: number[];

    @RelationId((post: Post) => post.subcategories, "removedSubcategories", qb => qb.where("removedSubcategories.isRemoved = :isRemoved", { isRemoved: true }))
    removedSubcategoryIds: number[];

}