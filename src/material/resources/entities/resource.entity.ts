
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


/**
 * 
 *   

   
    
    
   
 */

@Entity()
export class Resource {


  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
  searchParams: string;

  @Column({ type: 'longtext' })
  initialSearchValue: string;

  @Column({ type: 'longtext' })
  tableColumns: string;

  @Column({ type: 'longtext' })
  searchConfig: string;

  @Column({ type: 'longtext' })
  watchScript: string;

  @Column()
  name: string;

  @Column()
  dept: string;

  @Column()
  note: string;

  @Column()
  apiPrefix: string;


  @Column()
  title: string;


}