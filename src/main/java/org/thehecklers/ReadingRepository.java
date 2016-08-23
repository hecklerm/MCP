package org.thehecklers;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by markheckler on 9/23/15.
 */

@RepositoryRestResource
public interface ReadingRepository extends CrudRepository<Reading, Integer> {
}
