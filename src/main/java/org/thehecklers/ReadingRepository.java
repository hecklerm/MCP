package org.thehecklers;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Created by markheckler on 9/23/15.
 */

@RepositoryRestResource(collectionResourceRel = "readings", path = "readings")
public interface ReadingRepository extends PagingAndSortingRepository<Reading, Integer> {

}
